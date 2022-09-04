import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faHeart,
  faBookmark,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../AuthContext';
import UserActionPopup from './UserActionPopup';

const UserActionMenu = ({ mediaType, mediaId }) => {
  const { isAuthenticated, accountId, sessionId } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const [actionType, setActionType] = useState('');

  const addToFavourites = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&session_id=${sessionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            media_type: mediaType,
            media_id: mediaId,
            favorite: true,
          }),
        }
      );

      const message = await response.json();

      if (message.success) {
        setShowPopup(true);
        setActionType('Favourites');
      }

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const addToWatchList = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=2a5e286bb1bdc7c0bf49d7b6d0707880&session_id=${sessionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            media_type: mediaType,
            media_id: mediaId,
            watchlist: true,
          }),
        }
      );

      const message = await response.json();

      if (message.success) {
        setShowPopup(true);
        setActionType('Watchlist');
      }

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  if (isAuthenticated) {
    return (
      <Dropdown className='user_actions_dropdown'>
        <Dropdown.Toggle className='user_actions_btn' id='dropdown-basic'>
          <FontAwesomeIcon icon={faEllipsis} size='xs' />
        </Dropdown.Toggle>

        <Dropdown.Menu className='user_actions_menu'>
          <Dropdown.Item onClick={() => addToFavourites()} variant='light'>
            <FontAwesomeIcon icon={faHeart} size='xs' /> Favourite
          </Dropdown.Item>
          <Dropdown.Item onClick={() => addToWatchList()} variant='light'>
            <FontAwesomeIcon icon={faBookmark} size='xs' /> Watchlist
          </Dropdown.Item>
          <Dropdown.Item variant='light'>
            <FontAwesomeIcon icon={faStar} size='xs' /> Your Rating
          </Dropdown.Item>
        </Dropdown.Menu>
        {showPopup ? (
          <UserActionPopup>
            Added to {mediaType} {actionType}!
          </UserActionPopup>
        ) : null}
      </Dropdown>
    );
  }
};

export default UserActionMenu;
