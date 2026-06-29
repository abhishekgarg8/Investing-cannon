import fs from "fs/promises";
import path from "path";

export interface Investor {
  id: string;
  slug: string;
  name: string;
  folder: string;
  profile?: string;
}

export async function getAllInvestors(): Promise<Investor[]> {
  const investorsDir = path.join(process.cwd(), "investors");

  try {
    const folders = await fs.readdir(investorsDir);

    const investors = await Promise.all(
      folders
        .filter((folder) => !folder.startsWith("."))
        .map(async (folder) => {
          const profilePath = path.join(investorsDir, folder, "profile.md");
          let profile = "";

          try {
            profile = await fs.readFile(profilePath, "utf-8");
          } catch (e) {
            // Profile not found, skip
          }

          // Extract name from folder (e.g., "001-warren-buffett" -> "Warren Buffett")
          const name = folder
            .split("-")
            .slice(1)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          const slug = folder.split("-").slice(1).join("-");

          return {
            id: folder,
            slug,
            name,
            folder,
            profile,
          };
        })
    );

    return investors.sort((a, b) => {
      const aNum = parseInt(a.id.split("-")[0]);
      const bNum = parseInt(b.id.split("-")[0]);
      return aNum - bNum;
    });
  } catch (error) {
    console.error("Error reading investors directory:", error);
    return [];
  }
}

export async function getInvestorBySlug(slug: string): Promise<Investor | null> {
  const investors = await getAllInvestors();
  return investors.find((inv) => inv.slug === slug) || null;
}

// Extract era/dates from profile
export function extractDates(profile: string): string {
  const match = profile.match(/(\d{4})[–-](?:present|\d{4})?/i);
  if (match) {
    return match[0];
  }
  return "";
}

// Extract first paragraph as intro
export function extractIntro(profile: string): string {
  const paragraphs = profile.split("\n\n");
  if (paragraphs.length > 0) {
    return paragraphs[0].substring(0, 150) + "...";
  }
  return "";
}
