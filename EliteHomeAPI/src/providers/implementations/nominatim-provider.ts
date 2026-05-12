import type { GeolocationProvider } from "../geolocation-provider";

interface NominatimReply {
  lat: number;
  lon: number;
}

export class NominatimProvider implements GeolocationProvider {
  async getCoordinates(
    address: string,
  ): Promise<{ latitude: number; longitude: number } | null> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address,
    )}&format=json&limit=1`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "EliteHome-BackendApp/1.0 (eltonvitorettijr@gmail.com)",
      },
    });

    const data = (await response.json()) as NominatimReply[];

    if (!data || data.length === 0) {
      return null;
    }

    return {
      latitude: Number(data.at(0)?.lat),
      longitude: Number(data.at(0)?.lon),
    };
  }
}
