import { useEffect, useState } from "react";

const formatCurrency = (value) => `$${Number(value).toLocaleString("en-US")}`;
const dataBaseUrl = `${import.meta.env.BASE_URL}data/`;

const getTimeGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) return "Good Morning!";
  if (currentHour < 18) return "Good Afternoon!";
  return "Good Evening!";
};

function DashboardMiddleTiles() {
  const [dataStatus, setDataStatus] = useState("Loading local data");
  const [portfolio, setPortfolio] = useState([]);
  const [activity, setActivity] = useState([]);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${dataBaseUrl}health.json`),
      fetch(`${dataBaseUrl}portfolio.json`),
      fetch(`${dataBaseUrl}activity.json`),
      fetch(`${dataBaseUrl}banner.json`),
    ])
      .then(
        async ([
          healthResponse,
          portfolioResponse,
          activityResponse,
          bannerResponse,
        ]) => {
          if (
            !healthResponse.ok ||
            !portfolioResponse.ok ||
            !activityResponse.ok ||
            !bannerResponse.ok
          )
            throw new Error("Local data unavailable");
          const [portfolioData, activityData, bannerData] = await Promise.all([
            portfolioResponse.json(),
            activityResponse.json(),
            bannerResponse.json(),
          ]);
          return { ...portfolioData, ...activityData, ...bannerData };
        },
      )
      .then(({ assets, activities, milestone }) => {
        setPortfolio(assets);
        setActivity(activities);
        setBanner(milestone);
        setDataStatus("Local data ready");
      })
      .catch(() => {
        setDataStatus("Local data unavailable");
      });
  }, []);

  return (
    <>
      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">How You get help from us!</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div style={{ width: '60px', height: '60px' }} className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
              <img src="https://www.svgrepo.com/show/339243/goals.svg" alt="Thumbnail" className="card-img-top"/>
            </div>
            <h3 className="fs-2 text-body-emphasis">Free Goal Discussion</h3>
            <p>
              Where financial planning meets cosmic insights—map your investments using standard risk profiling and astrological timing. Claim Your Free Strategy Session to align your financial goals with your stars.
            </p>
            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" aria-hidden="true">
                <use xlink:href="#chevron-right"></use>
              </svg>
            </a>
          </div>
          <div className="feature col">
            <div style={{ width: '60px', height: '60px' }} className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
              <img src="https://www.svgrepo.com/show/515480/check24.svg" alt="Thumbnail" className="card-img-top"/>
            </div>
            <h3 className="fs-2 text-body-emphasis">SEBI KYC Compliance</h3>
            <p>
              Secure your future by completing the mandatory SEBI KYC compliance framework. Start Your Setup to verify your details and unlock immediate access to mutual funds.
            </p>
            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" aria-hidden="true">
                <use xlink:href="#chevron-right"></use>
              </svg>
            </a>
          </div>
          <div className="feature col">
            <div style={{ width: '60px', height: '60px' }} className="feature-icon d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3">
              <img src="https://www.svgrepo.com/show/494959/portfolio.svg" alt="Thumbnail" className="card-img-top"/>
            </div>
            <h3 className="fs-2 text-body-emphasis">Portfolio Updates</h3>
            <p>
              Ensure your investments remain securely aligned with your long-term goals through regular check-ups. Request an Account Update to receive personalized adjustment insights from our team.
            </p>
            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" aria-hidden="true">
                <use xlink:href="#chevron-right"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardMiddleTiles;
