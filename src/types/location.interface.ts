export interface GeocodingResponse {
    geocoding: Geocoding;
    type: string;
    features: Feature[];
    bbox: [number, number, number, number];
}

interface Geocoding {
    version: string;
    attribution: string;
    query: GeocodingQuery;
    warnings: string[];
    engine: Engine;
    timestamp: number;
}

interface GeocodingQuery {
    text: string;
    size: number;
    layers: LayerType[];
    private: boolean;
    lang: Language;
    querySize: number;
    parser: symbol;
    parsed_text: ParsedText;
}

type LayerType =
    | "venue"
    | "street"
    | "country"
    | "macroregion"
    | "region"
    | "county"
    | "localadmin"
    | "locality"
    | "borough"
    | "neighbourhood"
    | "continent"
    | "empire"
    | "dependency"
    | "macrocounty"
    | "macrohood"
    | "microhood"
    | "disputed"
    | "postalcode"
    | "ocean"
    | "marinearea";

interface Language {
    name: string;
    iso6391: string;
    iso6393: string;
    via: string;
    defaulted: boolean;
}

interface ParsedText {
    city: string;
    country: string;
}

interface Engine {
    name: string;
    author: string;
    version: string;
}

export interface Feature {
    type: "Feature";
    geometry: Geometry;
    properties: Properties;
    bbox: [number, number, number, number];
}

interface Geometry {
    type: "Point";
    coordinates: [number, number];
}

interface Properties {
    id: string;
    gid: string;
    layer: LayerType;
    source: string;
    source_id: string;
    name: string;
    confidence: number;
    match_type: string;
    accuracy: string;
    country: string;
    country_gid: string;
    country_a: string;
    region: string;
    region_gid: string;
    region_a: string;
    county: string;
    county_gid: string;
    county_a: string;
    locality: string;
    locality_gid: string;
    continent: string;
    continent_gid: string;
    label: string;
}
