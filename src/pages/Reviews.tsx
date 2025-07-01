import styled from '@emotion/styled';

const ReviewsContainer = styled.div`
  max-width: 700px;
  margin: 2em auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(53, 82, 74, 0.07);
  padding: 2.5em 2em;
  color: #35524A;
  font-size: 1.15em;
`;

const ReviewsTitle = styled.h1`
  font-size: 2.2em;
  margin-bottom: 0.5em;
  text-align: center;
`;

const ReviewBlock = styled.div`
  margin-bottom: 2em;
  padding-bottom: 1em;
  border-bottom: 1px solid #F6E7CB;
`;

const Stars = styled.div`
  font-size: 1.3em;
  color: #FFD166;
  margin-bottom: 0.3em;
`;

const Quote = styled.blockquote`
  font-style: italic;
  margin: 0.5em 0 0.5em 0;
  padding-left: 1em;
  border-left: 4px solid #FFD166;
`;

const Reviewer = styled.div`
  font-size: 0.98em;
  color: #6A994E;
  margin-bottom: 0.2em;
`;

const Reviews = () => (
  <ReviewsContainer>
    <ReviewsTitle>🌟 Customer Reviews</ReviewsTitle>
    <ReviewBlock>
      <Stars>⭐⭐⭐⭐⭐</Stars>
      <Quote>“My dog licked the bowl clean... and then tried to eat the bowl.”</Quote>
      <Reviewer>— Sarah T., Oregon</Reviewer>
      <p>Gravity Farms has completely ruined other pet food for us. Luna used to be a picky eater — now she sits by the fridge like she's waiting for her DoorDash order.</p>
    </ReviewBlock>
    <ReviewBlock>
      <Stars>⭐⭐⭐⭐⭐</Stars>
      <Quote>“You'd think we were serving steak.”</Quote>
      <Reviewer>— Marcus D., Illinois</Reviewer>
      <p>Our lab, Moose, went full Gordon Ramsay on his old kibble after trying Gravity Farms. He flipped the bowl and everything. Now it's fresh or nothing.</p>
    </ReviewBlock>
    <ReviewBlock>
      <Stars>⭐⭐⭐⭐☆</Stars>
      <Quote>“Love the food. The box became my cat's new apartment.”</Quote>
      <Reviewer>— Emily R., California</Reviewer>
      <p>Okay, I know this is for dogs, but I accidentally left the delivery box open and my cat moved in. The food smells amazing — if I didn't know better, I'd say it was Sunday dinner.</p>
    </ReviewBlock>
    <ReviewBlock>
      <Stars>⭐⭐⭐⭐⭐</Stars>
      <Quote>“Our vet asked what we were feeding him. I panicked and said 'love.'”</Quote>
      <Reviewer>— James P., New York</Reviewer>
      <p>But seriously, our golden retriever, Bowie, has more energy, shinier fur, and fewer tummy issues since switching. 10/10 would recommend (and have, to everyone at the dog park).</p>
    </ReviewBlock>
    <ReviewBlock>
      <Stars>⭐⭐⭐⭐⭐</Stars>
      <Quote>“Finally, a food worthy of a dog named Mabel.”</Quote>
      <Reviewer>— Anonymous, Gravity Falls</Reviewer>
      <p>Mabel knows quality, and this is it. She hasn't tried to bury a single meal since we made the switch. Even Wendy seems impressed — and Wendy is hard to impress.</p>
    </ReviewBlock>
  </ReviewsContainer>
);

export default Reviews; 