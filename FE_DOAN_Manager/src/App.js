import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoutes } from '~/routes';
import DefaultLayoutUser from './components/customer/layout';
import { Fragment } from 'react';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Điều hướng từ đường dẫn gốc đến URL mong muốn */}
          <Route path="/" element={<Navigate to="/manager/reportSales" replace />} />

          {AppRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayoutUser;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
