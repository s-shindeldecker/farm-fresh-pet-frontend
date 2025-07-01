import styled from '@emotion/styled';

const FAQContainer = styled.div`
  max-width: 700px;
  margin: 2em auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(53, 82, 74, 0.07);
  padding: 2.5em 2em;
  color: #35524A;
  font-size: 1.15em;
`;

const FAQTitle = styled.h1`
  font-size: 2.2em;
  margin-bottom: 0.5em;
  text-align: center;
`;

const Question = styled.h2`
  font-size: 1.15em;
  margin-top: 1.5em;
  color: #6A994E;
`;

const FAQ = () => (
  <FAQContainer>
    <FAQTitle>❓ Frequently Asked Questions (FAQ)</FAQTitle>
    <Question>What makes Gravity Farms different from other pet food brands?</Question>
    <p>Great question. For starters, we don't use ingredients you can't pronounce. Our food is made fresh, using real, recognizable stuff — like chicken, carrots, and sweet potatoes. No "meat slurry," no "natural flavoring," and absolutely no powdered unicorn horn (we checked, it's not FDA approved).</p>
    <Question>Is your food really human-grade?</Question>
    <p>Yep! Everything we use is safe enough for you to eat — though legally we're supposed to say "please don't." Unless you're into that kind of thing. No judgment.</p>
    <Question>How is the food delivered?</Question>
    <p>Your meals arrive chilled in eco-friendly packaging, with enough insulation to survive the wilds of Gravity Falls and the occasional porch possum. Just store in the fridge or freezer and serve as needed.</p>
    <Question>Do you offer food for cats?</Question>
    <p>Not yet! Wendy and Mabel voted against it (they're very dog-centric), but our R&D team is definitely considering feline friends in the future. If your cat wants to file a formal request, we accept paw-written letters.</p>
    <Question>How do I transition my pet to Gravity Farms food?</Question>
    <p>Slow and steady wins the race! Start by mixing a little Gravity Farms food with your pet's current food, then gradually increase over 5–7 days. Trust us — their tummies (and your rugs) will thank you.</p>
    <Question>Can I customize meals based on my pet's diet or allergies?</Question>
    <p>We're working on more customization options! Right now, our recipes are designed to be wholesome and allergy-friendly for most pets, but if your dog is allergic to... say, air, shoot us a message and we'll try to help.</p>
    <Question>Where is Gravity Farms located?</Question>
    <p>We're based just outside the highly mysterious town of Gravity Falls. If you've seen a goat on a skateboard or a guy named Soos doing donuts in a golf cart, you're close.</p>
    <Question>Is this all real?</Question>
    <p>The food? Absolutely. The company? For demo purposes only. But honestly, if you're still reading this — you probably wish it were real too.</p>
  </FAQContainer>
);

export default FAQ; 