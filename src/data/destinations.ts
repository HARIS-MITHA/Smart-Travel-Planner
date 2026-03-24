import ootyImg from "@/assets/ooty.jpg";
import chennaiImg from "@/assets/chennai.jpg";
import mysoreImg from "@/assets/mysore.jpg";
import ootyBotanical from "@/assets/places/ooty-botanical.jpg";
import ootyLake from "@/assets/places/ooty-lake.jpg";
import doddabetta from "@/assets/places/doddabetta.jpg";
import kapaleeshwarar from "@/assets/places/kapaleeshwarar.jpg";
import fortStGeorge from "@/assets/places/fort-st-george.jpg";
import mysorePalace from "@/assets/places/mysore-palace.jpg";
import chamundiHills from "@/assets/places/chamundi-hills.jpg";
import brindavanGardens from "@/assets/places/brindavan-gardens.jpg";

export interface Place {
  id: string;
  name: string;
  image: string;
  description: string;
  estimatedCost: number;
  category: string;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  places: Place[];
  checklist: string[];
}

export const destinations: Destination[] = [
  {
    id: "ooty",
    name: "Ooty",
    image: ootyImg,
    description: "The Queen of Hill Stations nestled in the Nilgiri mountains, known for tea gardens and misty landscapes.",
    places: [
      { id: "ooty-1", name: "Botanical Garden", image: ootyBotanical, description: "A sprawling 55-acre garden with rare plant species, fern houses, and a fossilized tree trunk.", estimatedCost: 200, category: "Nature" },
      { id: "ooty-2", name: "Ooty Lake", image: ootyLake, description: "A serene artificial lake perfect for boating amidst eucalyptus trees and green hills.", estimatedCost: 300, category: "Nature" },
      { id: "ooty-3", name: "Doddabetta Peak", image: doddabetta, description: "The highest peak in the Nilgiris at 2,637m offering panoramic views of the surrounding hills.", estimatedCost: 150, category: "Adventure" },
      { id: "ooty-4", name: "Tea Factory Visit", image: ootyImg, description: "Tour a working tea factory to learn about tea processing and sample fresh Nilgiri tea.", estimatedCost: 100, category: "Culture" },
      { id: "ooty-5", name: "Rose Garden", image: ootyBotanical, description: "Home to over 20,000 varieties of roses spread across terraced slopes.", estimatedCost: 100, category: "Nature" },
      { id: "ooty-6", name: "Nilgiri Mountain Railway", image: ootyLake, description: "UNESCO World Heritage toy train winding through tunnels, bridges and tea estates.", estimatedCost: 500, category: "Adventure" },
    ],
    checklist: ["Warm clothes & jacket", "Comfortable walking shoes", "Camera", "Sunscreen", "Rain gear", "Snacks for mountain treks", "Power bank"],
  },
  {
    id: "chennai",
    name: "Chennai",
    image: chennaiImg,
    description: "The cultural capital of South India, blending ancient temples, colonial heritage and vibrant beaches.",
    places: [
      { id: "chennai-1", name: "Marina Beach", image: chennaiImg, description: "The second longest urban beach in the world, stretching 13 km along the Bay of Bengal.", estimatedCost: 0, category: "Nature" },
      { id: "chennai-2", name: "Kapaleeshwarar Temple", image: kapaleeshwarar, description: "A stunning 7th-century Dravidian temple dedicated to Lord Shiva with intricate gopuram.", estimatedCost: 0, category: "Culture" },
      { id: "chennai-3", name: "Fort St. George", image: fortStGeorge, description: "The first English fortress in India, built in 1644, now housing a museum.", estimatedCost: 100, category: "History" },
      { id: "chennai-4", name: "Government Museum", image: fortStGeorge, description: "One of India's oldest museums with a rich collection of archaeology and art.", estimatedCost: 50, category: "Culture" },
      { id: "chennai-5", name: "San Thome Basilica", image: kapaleeshwarar, description: "A neo-Gothic church built over the tomb of St. Thomas the Apostle.", estimatedCost: 0, category: "History" },
      { id: "chennai-6", name: "DakshinaChitra", image: chennaiImg, description: "A living-history museum showcasing art, architecture and crafts of South India.", estimatedCost: 200, category: "Culture" },
    ],
    checklist: ["Light cotton clothing", "Sunglasses & hat", "Water bottle", "Comfortable sandals", "Temple-appropriate clothing", "Mosquito repellent", "Local currency"],
  },
  {
    id: "mysore",
    name: "Mysore",
    image: mysoreImg,
    description: "The City of Palaces, famous for royal heritage, silk sarees, sandalwood and Dasara festivities.",
    places: [
      { id: "mysore-1", name: "Mysore Palace", image: mysorePalace, description: "The magnificent royal residence with Indo-Saracenic architecture, illuminated by 97,000 bulbs.", estimatedCost: 200, category: "History" },
      { id: "mysore-2", name: "Chamundi Hills", image: chamundiHills, description: "A sacred hilltop temple offering stunning panoramic views of the entire city.", estimatedCost: 0, category: "Adventure" },
      { id: "mysore-3", name: "Brindavan Gardens", image: brindavanGardens, description: "Terraced gardens with a spectacular musical fountain show in the evening.", estimatedCost: 250, category: "Nature" },
      { id: "mysore-4", name: "St. Philomena's Church", image: mysorePalace, description: "One of the tallest churches in Asia with stunning Neo-Gothic architecture.", estimatedCost: 0, category: "History" },
      { id: "mysore-5", name: "Mysore Zoo", image: chamundiHills, description: "One of India's oldest and best-maintained zoos with diverse wildlife.", estimatedCost: 150, category: "Nature" },
      { id: "mysore-6", name: "Devaraja Market", image: mysoreImg, description: "A bustling 100-year-old market selling spices, flowers, sandalwood and silk.", estimatedCost: 100, category: "Culture" },
    ],
    checklist: ["Comfortable walking shoes", "Camera for palace shots", "Light clothing", "Sunscreen", "Evening wear for garden show", "Cash for market shopping", "Water bottle"],
  },
];
