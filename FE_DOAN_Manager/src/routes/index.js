import { PATH } from '~/constants/part';

//MANAGER
import ManagerLayout from '~/components/manager/layout';
import M_LoginPage from '~/pages/manager/LoginPage/LoginPage';
import M_Dashboard from '~/pages/manager/Dashboard';
import M_AccountPage from '~/pages/manager/AccountPage/AccountPage';

import M_ProductFormPage from '~/pages/manager/ProductPage/ProductFormPage';
import M_ProductListPage from '~/pages/manager/ProductPage/ProductListPage';

import M_FunctionFormPage from '~/pages/manager/SystemPage/FunctionFormPage';
import M_FunctionListPage from '~/pages/manager/SystemPage/FunctionListPage';
import M_RoleFormPage from '~/pages/manager/SystemPage/RoleFormPage';
import M_RoleListPage from '~/pages/manager/SystemPage/RoleListPage';

import M_CategoryFormPage from '~/pages/manager/masterDataPage/CategoryFormPage';
import M_CategoryListPage from '~/pages/manager/masterDataPage/CategoryListPage';
import M_UomFormPage from '~/pages/manager/masterDataPage/UomFormPage';
import M_UomListPage from '~/pages/manager/masterDataPage/UomListPage';
import M_TaxFormPage from '~/pages/manager/masterDataPage/TaxFormPage';
import M_TaxListPage from '~/pages/manager/masterDataPage/TaxListPage';
import M_VendorListPage from '~/pages/manager/masterDataPage/VendorListPage';
import M_vendorFormPage from '~/pages/manager/masterDataPage/vendorFormPage';

import M_EmployeeFormPage from '~/pages/manager/EmployeePage/EmployeeFormPage';
import M_EmployeeListPage from '~/pages/manager/EmployeePage/EmployeeListPage';

import M_CustomerFormPage from '~/pages/manager/CustomerPage/CustomerFormPage';
import M_CustomerListPage from '~/pages/manager/CustomerPage/CustomerListPage';

import M_SalesFormPage from '~/pages/manager/SalesPage/SalesFormPage';
import M_SalesListPage from '~/pages/manager/SalesPage/SalesListPage';
import M_OrderFormPage from '~/pages/manager/SalesPage/OrderFormPage';
import M_OrderListPage from '~/pages/manager/SalesPage/OrderListPage';

import M_StockImportListPage from '~/pages/manager/WarehousePage/StockImportListPage';
import M_StockImportFormPage from '~/pages/manager/WarehousePage/StockImportFormPage';
import M_StockExportListPage from '~/pages/manager/WarehousePage/StockExportListPage';
import M_StockExportFormPage from '~/pages/manager/WarehousePage/StockExportFormPage';
import M_MaterialStockListPage from '~/pages/manager/WarehousePage/MaterialStockListPage';

import M_ReportSalePage from '~/pages/manager/ReportPage/ReportSalePage';
import M_ReportOrderPage from '~/pages/manager/ReportPage/ReportOrderPage';

export const AppRoutes = [
    //MANAGER
    { path: PATH.MANAGER.LOGIN, component: M_LoginPage, layout: null },
    { path: PATH.MANAGER.DASHBOARD, component: M_Dashboard, layout: ManagerLayout },
    { path: `${PATH.MANAGER.ACCOUNT}`, component: M_AccountPage, layout: ManagerLayout },

    { path: PATH.MANAGER.PRODUCTS, component: M_ProductListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.PRODUCTS}/:id`, component: M_ProductFormPage, layout: ManagerLayout },

    { path: PATH.MANAGER.FUNCTIONS, component: M_FunctionListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.FUNCTIONS}/:id`, component: M_FunctionFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.ROLES, component: M_RoleListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.ROLES}/:id`, component: M_RoleFormPage, layout: ManagerLayout },

    { path: PATH.MANAGER.CATEGORIES, component: M_CategoryListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.CATEGORIES}/:id`, component: M_CategoryFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.UOMS, component: M_UomListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.UOMS}/:id`, component: M_UomFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.TAXS, component: M_TaxListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.TAXS}/:id`, component: M_TaxFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.VENDORS, component: M_VendorListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.VENDORS}/:id`, component: M_vendorFormPage, layout: ManagerLayout },

    { path: PATH.MANAGER.EMPLOYEES, component: M_EmployeeListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.EMPLOYEES}/:id`, component: M_EmployeeFormPage, layout: ManagerLayout },

    { path: PATH.MANAGER.CUSTOMERS, component: M_CustomerListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.CUSTOMERS}/:id`, component: M_CustomerFormPage, layout: ManagerLayout },

    { path: PATH.MANAGER.SALES, component: M_SalesListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.SALES}/:id`, component: M_SalesFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.ORDERS, component: M_OrderListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.ORDERS}/:id`, component: M_OrderFormPage, layout: ManagerLayout },

    { path: PATH.MANAGER.MATERIALSTOCKS, component: M_MaterialStockListPage, layout: ManagerLayout },
    { path: PATH.MANAGER.STOCKIMPORTS, component: M_StockImportListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.STOCKIMPORTS}/:id`, component: M_StockImportFormPage, layout: ManagerLayout },
    { path: PATH.MANAGER.STOCKEXPORTS, component: M_StockExportListPage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.STOCKEXPORTS}/:id`, component: M_StockExportFormPage, layout: ManagerLayout },

    { path: `${PATH.MANAGER.REPORTSALES}`, component: M_ReportSalePage, layout: ManagerLayout },
    { path: `${PATH.MANAGER.REPORTORDERS}`, component: M_ReportOrderPage, layout: ManagerLayout },

];

