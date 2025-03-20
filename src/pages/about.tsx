import DefaultLayout from "../layouts/default";

import { title } from "../components/primitives";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center justify-center max-w-[80vw] mx-auto text-center">
          <h1 className={title()}>About</h1>

          <div className="sketchfab-embed-wrapper">
            {" "}
            <iframe
              allow="autoplay; fullscreen; xr-spatial-tracking"
              className="w-[80vw] aspect-video"
              frameBorder="0"
              src="https://sketchfab.com/models/30d194521f504e5f9db3895f59501381/embed"
              title="DNA Model Level 1"
            >
              {" "}
            </iframe>{" "}
            <p
              style={{
                fontSize: "13px",
                fontWeight: "normal",
                margin: "5px",
                color: "#4A4A4A",
              }}
            >
              {" "}
              <a
                href="https://sketchfab.com/3d-models/dna-model-level-1-30d194521f504e5f9db3895f59501381?utm_medium=embed&utm_campaign=share-popup&utm_content=30d194521f504e5f9db3895f59501381"
                rel="nofollow noreferrer"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
                target="_blank"
              >
                {" "}
                DNA Model Level 1{" "}
              </a>{" "}
              by{" "}
              <a
                href="https://sketchfab.com/fantaland?utm_medium=embed&utm_campaign=share-popup&utm_content=30d194521f504e5f9db3895f59501381"
                rel="nofollow noreferrer"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
                target="_blank"
              >
                {" "}
                fantaland{" "}
              </a>{" "}
              on{" "}
              <a
                href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=30d194521f504e5f9db3895f59501381"
                rel="nofollow noreferrer"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
                target="_blank"
              >
                Sketchfab
              </a>
            </p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
