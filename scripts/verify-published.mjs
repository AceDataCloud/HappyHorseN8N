import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const packageName = "@acedatacloud/n8n-nodes-happyhorse";
const version = process.env.PACKAGE_VERSION || "0.1.1";
assert.match(version, /^\d+\.\d+\.\d+$/);
const output = "artifacts/published-package";
await mkdir(output, { recursive: true });

async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  assert.ok(response.ok, `GET ${url}: HTTP ${response.status}`);
  return response;
}

const catalogUrl = new URL("https://api.n8n.io/api/community-nodes");
catalogUrl.searchParams.set("filters[packageName][$eq]", packageName);
catalogUrl.searchParams.set("pagination[pageSize]", "100");
const catalog = await (await get(catalogUrl)).json();
const entry = catalog.data
  .map((row) => row.attributes || row)
  .find((row) => row.packageName === packageName);
assert.ok(
  entry?.isPublished,
  "The package must be published in the production verified catalog",
);
const officialChecksum =
  entry.npmVersion === version
    ? entry.checksum
    : entry.nodeVersions?.find((row) => row.npmVersion === version)?.checksum;
assert.ok(
  officialChecksum,
  `Version ${version} is not in the official verified catalog`,
);

const registryUrl = `https://registry.npmjs.org/${encodeURIComponent(packageName)}/${version}`;
const metadata = await (await get(registryUrl)).json();
assert.equal(metadata.name, packageName);
assert.equal(metadata.version, version);
assert.equal(
  new URL(metadata.dist.tarball).origin,
  "https://registry.npmjs.org",
);
const archive = Buffer.from(
  await (await get(metadata.dist.tarball)).arrayBuffer(),
);
const checksum = `sha512-${createHash("sha512").update(archive).digest("base64")}`;
assert.equal(
  checksum,
  metadata.dist.integrity,
  "Tarball differs from the npm integrity receipt",
);
assert.equal(
  checksum,
  officialChecksum,
  "Tarball differs from the n8n verified checksum",
);
const archivePath = `${output}/package.tgz`;
await writeFile(archivePath, archive);

const files = execFileSync("tar", ["-tzf", archivePath], { encoding: "utf8" })
  .trim()
  .split("\n");
assert.ok(
  files.every(
    (path) => path.startsWith("package/") && !path.split("/").includes(".."),
  ),
);
const readFile = (path) =>
  execFileSync("tar", ["-xOf", archivePath, `package/${path}`], {
    encoding: "utf8",
  });
const manifest = JSON.parse(readFile("package.json"));
assert.equal(manifest.name, packageName);
assert.equal(manifest.version, version);
assert.deepEqual(Object.keys(manifest.dependencies || {}), []);
for (const path of [...manifest.n8n.nodes, ...manifest.n8n.credentials]) {
  assert.ok(
    files.includes(`package/${path}`),
    `Missing published entrypoint: ${path}`,
  );
}
const readme = readFile("README.md");
for (const text of [
  "Initialize General Application",
  "Manage Keys",
  "Expiration Time",
  "Allowed APIs",
  "platform-",
  "utm_source=opensource",
  "utm_medium=referral",
  "utm_campaign=evergreen",
  "utm_content=happyhorsen8n_readme_api_key",
]) {
  assert.ok(
    readme.includes(text),
    `Missing published onboarding text: ${text}`,
  );
}
await writeFile(`${output}/README.md`, readme);
await writeFile(
  `${output}/receipt.json`,
  `${JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      packageName,
      version,
      catalogUrl: catalogUrl.toString(),
      publishedAt: entry.publishedAt,
      registryUrl,
      tarballUrl: metadata.dist.tarball,
      registryIntegrity: metadata.dist.integrity,
      officialChecksum,
      actualChecksum: checksum,
      tarballSha256: createHash("sha256").update(archive).digest("hex"),
      gitHead: metadata.gitHead,
      entrypoints: manifest.n8n,
      keyOnboarding: true,
      readmeAttribution: true,
    },
    null,
    2,
  )}\n`,
);
console.log(
  `PASS: ${packageName}@${version} matches npm and n8n checksums, entrypoints and onboarding`,
);
