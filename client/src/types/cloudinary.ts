export interface FileData {
  id: string;
  batchId: string;
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  access_control: AccessControl[];
  original_filename: string;
  path: string;
  thumbnail_url: string;
}

export interface AccessControl {
  access_type: string;
}

export interface ImageUploadEvent {
  event: string;
  info: FileData;
}
