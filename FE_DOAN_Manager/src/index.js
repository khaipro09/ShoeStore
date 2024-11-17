import React from 'react';
// import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import GlobalStyles from './assets/global-style';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import ReactDOM from 'react-dom';

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStyles>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <App />
      </Provider>,
    </I18nextProvider>
  </GlobalStyles>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
