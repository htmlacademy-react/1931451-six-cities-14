import MainScreen from '../../pages/main-screen/main-screen';
import { OfferType } from '../../types/offers.type';

type AppProps = {
  offers: OfferType[];
};

function App({ offers }: AppProps): JSX.Element {
  return (
    <MainScreen offers={offers} />
  );
}

export default App;
