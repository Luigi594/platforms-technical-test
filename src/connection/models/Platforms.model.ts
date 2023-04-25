export interface IPlatforms {
  _id?: string;
  platformID: string;
  platformName: string;
  authEntryPoint: string;
  contentEntryPoint: string;
  presentation: "Embedded" | "NewWindow" | "SameWindow";
  platformState: "Construction" | "Active" | "Deprecated";
}
