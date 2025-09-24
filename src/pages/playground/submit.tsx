export function getServerSideProps() {
  return {
    redirect: {
      destination: 'https://flockwork.org/request-help',
      permanent: true,
    },
  };
}

const SubmitRequestPage = () => {
  return <></>;
};

export default SubmitRequestPage;
