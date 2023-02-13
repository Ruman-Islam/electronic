import AccountSidebar from "@/components/Account/AccountSidebar";
import AccountWizard from "@/components/Account/AccountWizard";
import Layout from "@/components/Layout";

const OrderScreen = () => {
  return (
    <Layout title="Order History">
      <AccountWizard title="Order History" />
      <div className="flex gap-x-5">
        <AccountSidebar />
        <div>This is order page</div>
      </div>
    </Layout>
  );
};

OrderScreen.auth = true;
export default OrderScreen;
