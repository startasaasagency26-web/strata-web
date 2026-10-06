/**
 * Strata's social profiles. One place for every social link on the site.
 *
 * The footer renders these in array order. The same URLs are copied by hand into
 * the `sameAs` lists of the JSON-LD in index.html (and the X handle into its
 * `twitter:site` tag): change both together. To add a profile, add one entry
 * here; `SocialLinks` already has an icon for every `id` in `SocialProfileId`.
 *
 * `owner` says whose profile it is. Company profiles go in the Organization's
 * `sameAs`; the founder's personal profile goes in the founder's `sameAs`,
 * because schema.org `sameAs` means "this same entity", and a person is not
 * the company.
 *
 * All URLs verified by Atlas 2026-10-06.
 */
export type SocialProfileId = "linkedin" | "instagram" | "facebook" | "x" | "threads";

export type SocialProfile = {
  id: SocialProfileId;
  /** Visible name of the network. */
  label: string;
  /** Accessible name of the link. */
  ariaLabel: string;
  url: string;
  owner: "organization" | "founder";
};

export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    ariaLabel: "Nick Amirul, founder, on LinkedIn",
    url: "https://www.linkedin.com/in/nick-amirul-7039b9428/",
    owner: "founder",
  },
  {
    id: "instagram",
    label: "Instagram",
    ariaLabel: "Strata on Instagram",
    url: "https://www.instagram.com/strata.gtech/",
    owner: "organization",
  },
  {
    id: "facebook",
    label: "Facebook",
    ariaLabel: "Strata on Facebook",
    url: "https://www.facebook.com/profile.php?id=61593836195242",
    owner: "organization",
  },
  {
    id: "x",
    label: "X",
    ariaLabel: "Strata on X",
    url: "https://x.com/StrataGrowth",
    owner: "organization",
  },
  {
    id: "threads",
    label: "Threads",
    ariaLabel: "Strata on Threads",
    url: "https://www.threads.com/@strata.gtech",
    owner: "organization",
  },
];

/** The site's X account, for the `twitter:site` card tag. */
export const X_HANDLE = "@StrataGrowth";
