import React from 'react';
import classNames from 'classnames';

type MapProps = {
  className?: string;
};

export const Map: React.FC<MapProps> = ({ className }) => (
  <section
    className={classNames('map', className)}
  />
);
