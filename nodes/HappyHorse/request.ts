import type { IDataObject, IExecuteFunctions } from "n8n-workflow";
import {
  callback,
  choice,
  integer,
  object,
  requiredText,
  imageUrls,
  publicUrl,
} from "./helpers";
export function buildRequest(
  context: IExecuteFunctions,
  index: number,
): { endpoint: string; body: IDataObject; headers?: IDataObject } {
  const get = (name: string, fallback?: unknown) =>
    context.getNodeParameter(name, index, fallback as IDataObject);
  const operation = String(get("operation"));
  const options = object(get("options", {}));

  const op = choice(operation, "Operation", [
    "generate",
    "imageToVideo",
    "referenceToVideo",
    "edit",
  ]);
  const action = {
    generate: "generate",
    imageToVideo: "image_to_video",
    referenceToVideo: "reference_to_video",
    edit: "video_edit",
  }[op];
  const suffix = {
    generate: "t2v",
    imageToVideo: "i2v",
    referenceToVideo: "r2v",
    edit: "video-edit",
  }[op];
  const models =
    op === "edit"
      ? ["happyhorse-1.0-video-edit"]
      : [`happyhorse-1.0-${suffix}`, `happyhorse-1.1-${suffix}`];
  const body: IDataObject = {
    action,
    model: choice(get("model"), "Model", models),
    prompt: requiredText(get("prompt"), "Prompt"),
    resolution: choice(get("resolution", "720P"), "Resolution", [
      "720P",
      "1080P",
    ]),
    async: true,
  };
  if (op !== "edit")
    body.duration = integer(get("duration", 5), "Duration", 3, 15);
  if (op === "generate" || op === "referenceToVideo")
    body.ratio = choice(get("aspectRatio", "16:9"), "Aspect Ratio", [
      "16:9",
      "9:16",
      "1:1",
      "4:3",
      "3:4",
    ]);
  if (op === "imageToVideo")
    body.image_url = publicUrl(get("imageUrl"), "First Frame URL");
  if (op === "referenceToVideo")
    body.image_urls = imageUrls(get("imageUrls"), 1, 9);
  if (op === "edit") {
    body.video_url = publicUrl(get("videoUrl"), "Video URL");
    const images = imageUrls(get("imageUrls", ""), 0, 5);
    if (images.length) body.image_urls = images;
    body.audio_setting = choice(get("audioSetting", "auto"), "Audio", [
      "auto",
      "origin",
    ]);
  }
  if (options.seed !== undefined)
    body.seed = integer(options.seed, "Seed", 0, 2147483647);
  if (typeof options.watermark === "boolean")
    body.watermark = options.watermark;
  callback(options, body);
  return { endpoint: "/happyhorse/videos", body };
}
