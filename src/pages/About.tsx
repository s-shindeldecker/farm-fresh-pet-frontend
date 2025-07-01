import styled from '@emotion/styled';

const AboutContainer = styled.div`
  max-width: 700px;
  margin: 2em auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(53, 82, 74, 0.07);
  padding: 2.5em 2em;
  color: #35524A;
  font-size: 1.15em;
`;

const AboutTitle = styled.h1`
  font-size: 2.2em;
  margin-bottom: 0.5em;
  text-align: center;
`;

const AboutUs = () => (
  <AboutContainer>
    <AboutTitle>🐾 About Us – Gravity Farms Petfood</AboutTitle>
    <p>Welcome to Gravity Farms Petfood — where freshness meets fur.</p>
    <p>
      We started Gravity Farms in the little mountain town of Gravity Falls, a quiet place with towering pines, mysterious caves, and one very opinionated raccoon that lives near the compost pile.
    </p>
    <p>
      Our founders, lifelong animal lovers and amateur cryptid hunters, were inspired by their two dogs, Wendy and Mabel, who demanded more from their kibble. Literally — they refused to eat anything that wasn't fresh, nutritious, and served with love (and maybe a little goat cheese).
    </p>
    <p>
      Tired of the same old shelf-stable pellets, we built Gravity Farms around one simple belief:
    </p>
    <blockquote style={{ fontStyle: 'italic', color: '#6A994E', margin: '1.5em 0', borderLeft: '4px solid #FFD166', paddingLeft: '1em' }}>
      "Your pet deserves food that tastes like it came from a farm… not a factory."
    </blockquote>
    <p>Every meal we make is crafted with:</p>
    <ul style={{ marginLeft: '1.5em', marginBottom: '1em' }}>
      <li>Human-grade ingredients (but please don't eat it, Carl — it's for pets).</li>
      <li>Locally sourced vegetables and proteins (shoutout to Larry, our carrot guy).</li>
      <li>Recipes developed in consultation with real vets and very picky dogs.</li>
    </ul>
    <p>We believe in:</p>
    <ul style={{ marginLeft: '1.5em', marginBottom: '1em' }}>
      <li>Transparency (except when it comes to what's in the Secret Barn — don't ask).</li>
      <li>Sustainability (our delivery boxes are compostable AND make great cat forts).</li>
      <li>Joyful eating experiences for pets (tail wags are our currency).</li>
    </ul>
    <p>
      Thanks for stopping by. Whether your pet is a Wendy, a Mabel, or more of a Soos, we're glad you're here.
    </p>
  </AboutContainer>
);

export default AboutUs; 