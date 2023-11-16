// import { useParams } from 'react-router-dom';
// import Header from '../../components/header/header';
// import NotFoundScreen from '../not-found-screen/not-found-screen';
// import {
//   addPluralEnding,
//   getPercentRating,
//   setCapitalLetter,
// } from '../../utils/utils';
// import { DEFAULT_BEGIN, MAX_IMAGES_SHOW } from './offer-screen.const';
// import { Map } from '../../components/map/map';
// import NearPlaces from '../../components/near-places/near-places';
// import { Helmet } from 'react-helmet-async';
// import ReviewsList from '../../components/reviews-list/reviews-list';
// import { useAppSelector } from '../../hooks';

// export default function OfferScreen(): JSX.Element {
//   const { offers, reviews } = useAppSelector((store) => store);
//   const { offerId } = useParams();
//   const offer = offers.find((item) => item.id === offerId);

//   if (!offer) {
//     return <NotFoundScreen />;
//   }

//   const {
//     images,
//     isPremium,
//     title,
//     rating,
//     type,
//     bedrooms,
//     maxAdults,
//     price,
//     goods,
//     description,
//   } = offer;

//   const { avatarUrl, name, isPro } = offer.host;

//   return (
//     <div className="page">
//       <Helmet>
//         <title>6 Cities: {offer.title}</title>
//       </Helmet>

//       <Header />
//       <main className="page__main page__main--offer">
//         <section className="offer">
//           <div className="offer__gallery-container container">
//             <div className="offer__gallery">
//               {images
//                 .slice(DEFAULT_BEGIN, Math.min(MAX_IMAGES_SHOW, images.length))
//                 .map((image) => (
//                   <div className="offer__image-wrapper" key={image}>
//                     <img className="offer__image" src={image} alt={title} />
//                   </div>
//                 ))}
//             </div>
//           </div>
//           <div className="offer__container container">
//             <div className="offer__wrapper">
//               {isPremium && (
//                 <div className="offer__mark">
//                   <span>Premium</span>
//                 </div>
//               )}
//               <div className="offer__name-wrapper">
//                 <h1 className="offer__name">{title}</h1>
//                 <button className="offer__bookmark-button button" type="button">
//                   <svg className="offer__bookmark-icon" width={31} height={33}>
//                     <use xlinkHref="#icon-bookmark" />
//                   </svg>
//                   <span className="visually-hidden">To bookmarks</span>
//                 </button>
//               </div>
//               <div className="offer__rating rating">
//                 <div className="offer__stars rating__stars">
//                   <span style={{ width: getPercentRating(rating) }} />
//                   <span className="visually-hidden">Rating</span>
//                 </div>
//                 <span className="offer__rating-value rating__value">
//                   {rating}
//                 </span>
//               </div>
//               <ul className="offer__features">
//                 <li className="offer__feature offer__feature--entire">
//                   {setCapitalLetter(type)}
//                 </li>
//                 <li className="offer__feature offer__feature--bedrooms">
//                   {bedrooms} Bedroom{addPluralEnding(bedrooms)}
//                 </li>
//                 <li className="offer__feature offer__feature--adults">
//                   Max {maxAdults} adult{addPluralEnding(maxAdults)}
//                 </li>
//               </ul>
//               <div className="offer__price">
//                 <b className="offer__price-value">€{price}</b>
//                 <span className="offer__price-text">&nbsp;night</span>
//               </div>
//               <div className="offer__inside">
//                 <h2 className="offer__inside-title">What&apos;s inside</h2>
//                 <ul className="offer__inside-list">
//                   {goods.map((item) => (
//                     <li className="offer__inside-item" key={item}>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="offer__host">
//                 <h2 className="offer__host-title">Meet the host</h2>
//                 <div className="offer__host-user user">
//                   <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
//                     <img
//                       className="offer__avatar user__avatar"
//                       src={avatarUrl}
//                       width={74}
//                       height={74}
//                       alt="Host avatar"
//                     />
//                   </div>
//                   <span className="offer__user-name">{name}</span>
//                   {isPro && <span className="offer__user-status">Pro</span>}
//                 </div>
//                 <div className="offer__description">
//                   <p className="offer__text">{description}</p>
//                 </div>
//               </div>
//               <ReviewsList reviews={reviews} />
//             </div>
//           </div>
//           <Map
//             className="offer__map"
//             offers={offers}
//             activeOffer={offer}
//             isNeedZoom
//           />
//         </section>
//         <NearPlaces currentOffer={offer} offers={offers} />
//       </main>
//     </div>
//   );
// }
