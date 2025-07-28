import Header from './Header.js';
import TabsCollection from './Tabs.js';
import Carousel from './Carousel.js';
import Subscribe from './Subscribe.js';
import GoToTop from './GoToTop.js';
import SearchCard from './SearchCard.js';
import LoadCards from './LoadCards.js';

new Header();
const loadCardsInstance = new LoadCards();
new TabsCollection(loadCardsInstance);
new Carousel();
new Subscribe();
new GoToTop();
new SearchCard(loadCardsInstance);