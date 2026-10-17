const { test } = require("node:test");
const assert = require("node:assert/strict");
const { HappyHorse } = require("../dist/nodes/HappyHorse/HappyHorse.node.js");

test("the installed node retains its workflow identifier and exposes brand search/help metadata", () => {
  const description = new HappyHorse().description;
  assert.equal(description.name, "happyHorse");
  assert.deepEqual(description.inputs, ["main"]);
  assert.equal(description.usableAsTool, true);
  assert.ok(description.codex.alias.includes("happyhorse"));
  assert.ok(
    description.codex.resources.credentialDocumentation[0].url.endsWith(
      "#credentials",
    ),
  );
  assert.ok(
    description.codex.resources.primaryDocumentation[0].url.endsWith(
      "#use-the-node",
    ),
  );
});
