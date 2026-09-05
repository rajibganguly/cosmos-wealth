import { useEffect, useState } from "react";

const formatCurrency = (value) => `$${Number(value).toLocaleString("en-US")}`;
const dataBaseUrl = `${import.meta.env.BASE_URL}data/`;

const getTimeGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) return "Good Morning!";
  if (currentHour < 18) return "Good Afternoon!";
  return "Good Evening!";
};

function Header() {
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

  /* The local data file owns the asset names, values, and performance figures. */
  const displayPortfolio = portfolio.map((asset, index) => ({
    ...asset,
    detail:
      index === 0
        ? "Core allocation"
        : index === 1
          ? "Impact sleeve"
          : "Liquidity",
    value: formatCurrency(asset.value),
    tone: asset.change.startsWith("+") ? "positive" : "neutral",
  }));

  return (
    <>
      <div className="container-fluid">
        <header className="border-bottom lh-1 py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
              <a className="link-secondary" href="#" style={{ textDecoration: "none" }}>
                cosmos wealth
              </a>
            </div>
            <div className="col-4 text-center">
              
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <a className="btn btn-sm btn-outline-secondary" href="#">
                Sign up
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </header>{" "}
        <div className="nav-scroller py-1 mb-3 border-bottom">
          <nav className="nav nav-underline justify-content-between">
            <a className="nav-item nav-link link-body-emphasis active" href="#">
              Mutual Fund
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Insurance
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Stocks
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Money Market
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Loans
            </a>
          </nav>
        </div>
      </div>
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Rajib Ganguly (ARN-369290)</h1>
          <p className="col-md-10 fs-5 py-2">
            AMFI Registered Mutual Fund Distributor with Astro Advise
          </p>
          <p className="col-md-10 py-4">
            <small>Mutual Fund investments are subject to market risks, read all scheme related documents carefully. This is distribution-related educational guidance through Regular Plans only and does not constitute SEBI-registered investment advice.</small>
          </p>
          <button className="btn btn-primary btn-sm" type="button">
            Set Goals
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
