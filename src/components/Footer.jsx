import { useEffect, useState } from "react";

const formatCurrency = (value) => `$${Number(value).toLocaleString("en-US")}`;
const dataBaseUrl = `${import.meta.env.BASE_URL}data/`;

function Footer() {
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
      <div className="container-fluid">
        <div class="bg-dark-1 text-secondary px-4 py-5 text-center">
          <div className="py-5">
            <div class="col-lg-10 mx-auto">
              <span>Important Risk Disclosure:</span>
              <p class="fs-10 mb-4">
                Mutual Fund investments are subject to market risks, read all
                scheme related documents carefully. All information, tools,
                illustrations, and educational content on this website are for
                distribution-related guidance through Regular Plans only and do
                not constitute SEBI-registered investment advice,
                recommendation, or solicitation. Past performance is not
                indicative of future results. Actual returns may be higher,
                lower, or negative. SEBI and AMFI expressly prohibit
                distributors from guaranteeing or promising returns. Investments
                are processed only after completion of mandatory KYC and
                investor consent. All investments in Regular Plans go directly
                to the respective Asset Management Company (AMC).
              </p>
            </div>
            <p class="display-10 text-dark">Disclaimer | Terms of Use | Privacy Policy</p>
          </div>
          <p className="text-center">
            <span className="px-2">All rights reserved © 2026 cosmic-wealth by w3earth</span><br />
            <a
              data-type="link"
              data-id="https://rajibganguly.github.io/cosmos-wealth"
              href="https://rajibganguly.github.io/cosmos-wealth"
              target="_blank"
              rel="noreferrer noopener"
            >
              AMFI Registered Mutual Fund Distributor
            </a><br />
            <span>
                <strong>ARN-369290</strong> in India.
                <strong> Date of Initial Registration: </strong> 2 September, 2026
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
