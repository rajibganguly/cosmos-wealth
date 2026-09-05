import { useEffect, useState } from "react";

const formatCurrency = (value) => `$${Number(value).toLocaleString("en-US")}`;
const dataBaseUrl = `${import.meta.env.BASE_URL}data/`;

const getTimeGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) return "Good Morning!";
  if (currentHour < 18) return "Good Afternoon!";
  return "Good Evening!";
};

function DashboardTitle() {
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
      <div className="container dashboard-tiles-container">
        <h2 className="pb-2 border-bottom">Transparency, Compliance & Your Control</h2>
        <p className="py-4">Hi, {getTimeGreeting()} As an <strong>AMFI-registered Mutual Fund Distributor </strong> (ARN-369290), Rajib Ganguly receives trail commissions directly from fund houses for Regular Plan investments. In strict compliance with AMFI guidelines and the SEBI (Mutual Funds) Regulations, 2026, all earnings are transparently disclosed. You retain complete ownership and execution control over your portfolio at all times. No investment is processed without your explicit consent and a fully verified, mandatory SEBI KYC framework.</p>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div className="col">
            <div className="card shadow-sm">
              <img src="https://images.pexels.com/photos/31864396/pexels-photo-31864396.jpeg" alt="Thumbnail" className="card-img-top"/>
              <div className="card-body">
                <h3>Child's Education</h3>
                <p className="card-text pb-4">
                  Timeline: 10-15 years Equity-oriented SIPs, building corpus gradually with rupee cost averaging
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Calculator
                    </button>
                  </div>
                  <small className="text-body-secondary">10 Yrs</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm">
              <img src="https://images.pexels.com/photos/39191075/pexels-photo-39191075.jpeg" alt="Thumbnail" className="card-img-top"/>
              <div className="card-body">
                <h3>Retirement Planning</h3>
                <p className="card-text pb-4">
                  Timeline: 15–30 years Long-term equity SIPs + Life Cycle Funds with automatic glide path as retirement nears
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Calculator
                    </button>
                  </div>
                  <small className="text-body-secondary">20 Yrs</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm">
              <img src="https://images.pexels.com/photos/17131036/pexels-photo-17131036.jpeg" alt="Thumbnail" className="card-img-top"/>
              <div className="card-body">
                <h3>Home Down Payment</h3>
                <p className="card-text pb-4">
                  Timeline: 3-7 years Hybrid or debt-oriented funds based on risk profile and time horizon
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Calculator
                    </button>
                  </div>
                  <small className="text-body-secondary">7 Yrs</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm">
              <img src="https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg" alt="Thumbnail" className="card-img-top"/>
              <div className="card-body">
                <h3>Tax Saving under Section 80C (Old Tax Regime)</h3>
                <p className="card-text pb-4">
                  ELSS Funds | 3-year lock-in Up to ₹46,800 annual tax saving at 30% bracket + equity growth potential
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Calculator
                    </button>
                  </div>
                  <small className="text-body-secondary">5 Yrs</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm">
              <img src="https://images.pexels.com/photos/9755376/pexels-photo-9755376.jpeg" alt="Thumbnail" className="card-img-top"/>
              <div className="card-body">
                <h3>Long-Term Wealth Creation</h3>
                <p className="card-text pb-4">
                  Timeline: 7+ years Disciplined equity SIPs harnessing the power of compounding over time
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Calculator
                    </button>
                  </div>
                  <small className="text-body-secondary">25 Yrs</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm">
              <img src="https://images.pexels.com/photos/33125140/pexels-photo-33125140.jpeg" alt="Thumbnail" className="card-img-top"/>
              <div className="card-body">
                <h3>Lumpsum Deployment</h3>
                <p className="card-text pb-4">
                  Bonus, inheritance, or maturity proceeds Invested systematically via STPs, aligned to your risk profile and goal timeline
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Calculator
                    </button>
                  </div>
                  <small className="text-body-secondary">Instant</small>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default DashboardTitle;
