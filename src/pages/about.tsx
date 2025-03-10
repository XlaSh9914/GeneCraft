import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center justify-center max-w-[80vw] mx-auto text-center">
          <h1 className={title()}>About</h1>

          <div className="sketchfab-embed-wrapper">
            {" "}
            <iframe
              title="DNA Model Level 1"
              frameBorder="0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
              className="w-[80vw] aspect-video" 
              src="https://sketchfab.com/models/30d194521f504e5f9db3895f59501381/embed"
            >
              {" "}
            </iframe>{" "}

            <p style={{fontSize: "13px", fontWeight: "normal", margin: "5px", color: "#4A4A4A"}}>
              {" "}
              <a
                href="https://sketchfab.com/3d-models/dna-model-level-1-30d194521f504e5f9db3895f59501381?utm_medium=embed&utm_campaign=share-popup&utm_content=30d194521f504e5f9db3895f59501381"
                target="_blank"
                rel="nofollow"

                style={{fontWeight: "bold", color: "#1CAAD9"}}
              >
                {" "}
                DNA Model Level 1{" "}
              </a>{" "}
              by{" "}
              <a
                href="https://sketchfab.com/fantaland?utm_medium=embed&utm_campaign=share-popup&utm_content=30d194521f504e5f9db3895f59501381"
                target="_blank"
                rel="nofollow"

                style={{fontWeight: "bold", color: "#1CAAD9"}}
              >
                {" "}
                fantaland{" "}
              </a>{" "}
              on{" "}
              <a
                href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=30d194521f504e5f9db3895f59501381"
                target="_blank"
                rel="nofollow"

                style={{fontWeight: "bold", color: "#1CAAD9"}}
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
