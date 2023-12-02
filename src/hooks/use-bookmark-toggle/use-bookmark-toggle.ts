import { useState } from 'react';
import { AppRoute, OfferType } from '../../types';
import { useAppDispatch, useAppSelector } from '..';
import { isNeedBookmarkUpdateStatus } from '../../store/slices/favorites/selectors';
import { getAuthorizationStatus } from '../../store/slices/user/selectors';
import { checkAuthorizationStatus, debounce } from '../../utils/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchChangeFavoriteStatusAction } from '../../store/api-action';
import { setFavorite } from '../../store/slices/offers/offers';

export function useBookmarkToggle(
  id: OfferType['id'],
  isFavorite: OfferType['isFavorite']
) {
  const [isBookmarkActive, setBookmarkActive] = useState(isFavorite);
  const dispatch = useAppDispatch();
  const isNeedBookmarkUpdate = useAppSelector(isNeedBookmarkUpdateStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleBookmarkToggle = debounce(() => {
    if (!isLogged) {
      return navigate(AppRoute.Login, { state: { from: pathname } });
    }

    dispatch(
      fetchChangeFavoriteStatusAction({
        offerId: id,
        status: Number(!isBookmarkActive),
      })
    );

    if (isNeedBookmarkUpdate) {
      dispatch(setFavorite(id));
      setBookmarkActive((prev) => !prev);
    }
  });

  return { isBookmarkActive, handleBookmarkToggle };
}
