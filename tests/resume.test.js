const axios = require('axios').default;
const remark = require('remark');
const strip = require('strip-markdown');
const { getElementText } = require('./util');

describe('resume.nathanfriend.io', () => {
  let response;
  let json;
  let markdownStripper;

  beforeAll(async () => {
    markdownStripper = remark().use(strip);

    response = await page.goto('https://resume.nathanfriend.io');

    json = (
      await axios.get(
        'https://gitlab.com/nfriend/nuxt-resume/-/raw/master/resume-data.json',
      )
    ).data;
  });

  const findProfile = (profileName) => {
    return json.basics.profiles.find((p) => p.network === profileName);
  };

  const getPageText = async () => {
    return await page.evaluate(
      () => document.querySelector('body').textContent,
    );
  };

  const stripMarkdown = async (markdown) => {
    return (await markdownStripper.process(markdown)).contents.trim();
  };

  it('returns a 200 HTTP status code', async () => {
    expect(response.status()).toBe(200);
  });

  it('renders the correct title', async () => {
    expect(await page.title()).toBe('Nathan Friend - Résumé');
  });

  it('renders the correct header', async () => {
    expect(await getElementText('h1')).toBe(json.basics.name);
  });

  it('renders each profile as a contact link', async () => {
    const renderedProfiles = [
      {
        display: json.basics.email,
        url: `mailto:${json.basics.email}`,
      },
      {
        display: `${(json.basics.location.city, json.basics.location.region)}`,
        url: `https://www.google.com/maps/search/?api=1&query=${json.basics.location.city}%2C+${json.basics.location.region}`,
      },
      {
        display: 'LinkedIn',
        url: findProfile('LinkedIn').url,
      },
      {
        display: json.basics.website.replace(/https?:\/\//, ''),
        url: json.basics.website,
      },
      {
        display: 'GitLab',
        url: findProfile('GitLab').url,
      },
      {
        display: 'GitHub',
        url: findProfile('GitHub').url,
      },
    ];

    for (const profile of renderedProfiles) {
      const linkText = (
        await getElementText(`a[href="${profile.url}"]`)
      ).trim();

      expect(linkText).toContain(profile.display);
    }
  });

  it('renders main sections', async () => {
    const allH2Content = await page.$$eval('h2', (h2s) =>
      h2s.map((el) => el.textContent?.trim()),
    );

    for (const section of [
      'Experience',
      'Education',
      'Skills',
      'Internships/Part-time',
    ]) {
      expect(allH2Content).toContain(section);
    }
  });

  it('renders work summaries', async () => {
    const pageText = await getPageText();

    for (const work of json.work) {
      if (work.summary) {
        expect(pageText).toContain(work.summary);
      }
    }
  });

  it('renders work highlights', async () => {
    const pageText = await getPageText();

    for (const work of json.work) {
      if (work.highlights) {
        for (const highlight of work.highlights) {
          expect(pageText).toContain(await stripMarkdown(highlight));
        }
      }
    }
  });

  it('renders a "View as PDF" button with a link to a valid PDF', async () => {
    const buttonSelector = 'a.btn';

    expect(await getElementText(buttonSelector)).toContain('View as PDF');

    const pdfLink = await page.evaluate(
      (buttonSelector) => document.querySelector(buttonSelector).href,
      buttonSelector,
    );

    const pdfResponse = await axios.get(pdfLink);

    expect(pdfResponse.status).toBe(200);
  });

  it('renders a "View the source on GitLab" link that points to the GitLab project', async () => {
    const projectURL = 'https://gitlab.com/nfriend/nuxt-resume';

    expect(await getElementText(`a[href="${projectURL}"]`)).toContain(
      'View the source on GitLab',
    );
  });
});
