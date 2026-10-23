export function profileUrl(lang, file) {
  return `profile/${lang}/${file}`;
}

const endpoints = {
  social: 'profile/social.json',
};

export default endpoints;
