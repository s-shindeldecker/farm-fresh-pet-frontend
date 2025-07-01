import styled from '@emotion/styled';

const WhyContainer = styled.div`
  max-width: 700px;
  margin: 2em auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(53, 82, 74, 0.07);
  padding: 2.5em 2em;
  color: #35524A;
  font-size: 1.15em;
`;

const WhyTitle = styled.h1`
  font-size: 2.2em;
  margin-bottom: 0.5em;
  text-align: center;
`;

const WhyGravityFarms = () => (
  <WhyContainer>
    <WhyTitle>🌱 Why Gravity Farms?</WhyTitle>
    <p>At Gravity Farms Petfood, we believe fresh isn't a trend — it's a lifestyle. Your pet didn't evolve eating beige pellets that have a shelf life longer than most sitcoms. They deserve real food, made with real ingredients, by people who actually know what a carrot looks like.</p>
    <p>So why choose Gravity Farms? Glad you asked.</p>
    <h2 style={{ fontSize: '1.3em', marginTop: '1.5em' }}>🥩 Fresh Ingredients, Zero Weird Stuff</h2>
    <ul style={{ marginLeft: '1.5em', marginBottom: '1em' }}>
      <li>Human-grade meats and veggies (the kind you'd recognize on a dinner plate).</li>
      <li>No artificial preservatives, fillers, or mystery powders.</li>
      <li>Recipes your dog will devour and your cat will reluctantly admit are pretty decent.</li>
    </ul>
    <h2 style={{ fontSize: '1.3em', marginTop: '1.5em' }}>🏕️ Born in Gravity Falls, Cooked with Care</h2>
    <p>Our kitchens are tucked just outside the town limits of Gravity Falls (you know, near that one weird tree that glows at night). We're proudly small-batch, proudly picky, and proudly uninterested in going "mass market."</p>
    <h2 style={{ fontSize: '1.3em', marginTop: '1.5em' }}>🧪 Tested by Real Pets (and One Unpaid Intern)</h2>
    <p>Our flavor testers, Wendy and Mabel, are relentless. If a meal doesn't pass the sniff test, it doesn't make it to your doorstep.</p>
    <p>We've also consulted with veterinarians, animal nutritionists, and that guy at the farmer's market who says his dog is vegan. (She's not. We checked.)</p>
    <h2 style={{ fontSize: '1.3em', marginTop: '1.5em' }}>📦 Delivered Fresh, Fast, and in Style</h2>
    <p>Our meals arrive chilled and ready to serve — no science experiments required. Just scoop, serve, and bask in the glory of being your pet's favorite human.</p>
    <h2 style={{ fontSize: '1.3em', marginTop: '1.5em' }}>🐶 Fresh is Better. Gravity Farms is Fresher.</h2>
    <p>We don't cut corners. We don't make compromises. We just make pet food that feels right — because it is.</p>
    <p>Give it a try. Your pet will thank you. (Probably with a zoomie.)</p>
  </WhyContainer>
);

export default WhyGravityFarms; 