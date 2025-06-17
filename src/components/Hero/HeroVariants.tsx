import styled from '@emotion/styled';
import { useLDClient } from 'launchdarkly-react-client-sdk';

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface HeroVariantsProps {
  variant: string;
}

export const HeroVariants = ({ variant }: HeroVariantsProps) => {
  const ldClient = useLDClient();

  const handleImageLoad = () => {
    ldClient?.track('hero_image_loaded', {
      variant,
      timestamp: new Date().toISOString()
    });
  };

  switch (variant) {
    case 'treatment':
      return (
        <HeroImage
          src="/images/hero-treatment.jpg"
          alt="Fresh pet food delivery"
          onLoad={handleImageLoad}
        />
      );
    case 'control':
    default:
      return (
        <HeroImage
          src="/images/hero-control.jpg"
          alt="Pet food subscription"
          onLoad={handleImageLoad}
        />
      );
  }
}; 