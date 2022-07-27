import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const renderWithStore = (children: React.ReactElement) => {
  return render(<Provider store={store}>{children}</Provider>);
};

export { renderWithStore, screen, waitFor };
