export interface GeolocationProvider {
  getCoordinates(
    address: string,
  ): Promise<{ latitude: number; longitude: number } | null>;
}
