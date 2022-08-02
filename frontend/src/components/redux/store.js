import { configureStore } from '@reduxjs/toolkit';
import reducers from './features';

export default configureStore({
  reducer: reducers,
});
