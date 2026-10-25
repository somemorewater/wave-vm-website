const defaultGithubUrl = "https://github.com/somemorewater/waveVM";

export const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? defaultGithubUrl;
export const websiteRepoUrl = "https://github.com/somemorewater/wave-vm-website";
export const issuesUrl = githubUrl ? `${githubUrl}/issues` : "";
export const websiteIssuesUrl = `${websiteRepoUrl}/issues`;

export function sourceUrl(path: string): string {
  return githubUrl ? `${githubUrl}/blob/main/${path}` : "";
}
