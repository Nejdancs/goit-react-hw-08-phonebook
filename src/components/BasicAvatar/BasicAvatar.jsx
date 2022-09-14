import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    bgcolor: stringToColor(name),
  };
}

export default function BasicAvatar({ name, sx = {}, ...props }) {
  return <Avatar sx={{ ...sx, ...stringAvatar(name) }} {...props} />;
}

BasicAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
