import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from "n8n-workflow";

export class AceDataHappyHorseApi implements ICredentialType {
  name = "aceDataHappyHorseApi";
  displayName = "HappyHorse by Ace Data Cloud API";
  documentationUrl =
    "https://github.com/AceDataCloud/HappyHorseN8N#credentials";
  icon = "file:../nodes/HappyHorse/icon.png" as const;
  properties: INodeProperties[] = [
    {
      displayName: "API Token",
      name: "apiToken",
      type: "string",
      typeOptions: { password: true },
      default: "",
      required: true,
      description: "Your AceDataCloud application API token",
    },
    {
      displayName:
        'Create or copy an application API key in <a href="https://platform.acedata.cloud/console/applications?utm_source=opensource&utm_medium=referral&utm_campaign=evergreen&utm_content=happyhorsen8n_credential_api_key" target="_blank">Ace Data Cloud Applications</a>. Paste only the token into API Token; do not add Bearer.',
      name: "keySetup",
      type: "notice",
      default: "",
    },
  ];
  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      headers: { Authorization: "=Bearer {{$credentials.apiToken}}" },
    },
  };
  test: ICredentialTestRequest = {
    request: {
      baseURL: "https://api.acedata.cloud",
      url: "/happyhorse/tasks",
      method: "POST",
      body: { action: "retrieve_batch", ids: [] },
    },
  };
}
