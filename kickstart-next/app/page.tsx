"use client";

import DOMPurify from "dompurify";
import Image from "next/image";
import { getPage, initLivePreview, PersonalizeContext } from "@/lib/contentstack";
import { useContext, useEffect, useState, use } from "react";
import { Page } from "@/lib/types";
import ContentstackLivePreview, { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";
import Personalize from "@contentstack/personalize-edge-sdk";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const [page, setPage] = useState<Page>();

  const unwrappedParams = use(searchParams);

  const rawVariantParam = unwrappedParams?.[Personalize.VARIANT_QUERY_PARAM] ?? "";
  const variantParam = '0_1';

  const getContent = async () => {
    const page = await getPage("/", variantParam);
    setPage(page);
  };

  const PersonalizeInstance = useContext(PersonalizeContext);

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(getContent);

    if (PersonalizeInstance) {
      PersonalizeInstance.triggerImpression("0");
    } else {
      console.error("Personalize instance is not initialized yet.");
    }
  }, [PersonalizeInstance]);

  const debug = {
    variantParam,
    variantAlias: Personalize.variantParamToVariantAliases(variantParam).join(","),
  };

  console.log("Debug: ",debug)

  return (
    <main className="max-w-(--breakpoint-md) mx-auto">
      <section className="p-4">
        {page?.title ? (
          <h1 className="text-4xl font-bold mb-4 text-center" {...(page?.$ && page?.$.title)}>
            {page?.title} with Next
          </h1>
        ) : null}
        {page?.description ? (
          <p className="mb-4 text-center" {...(page?.$ && page?.$.description)}>
            {page?.description}
          </p>
        ) : null}
        {page?.image ? (
          <Image
            className="mb-4"
            width={768}
            height={414}
            src={page?.image.url}
            alt={page?.image.title}
            {...(page?.image?.$ && page?.image?.$.url)}
          />
        ) : null}
        {page?.rich_text ? (
          <div
            {...(page?.$ && page?.$.rich_text)}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(page?.rich_text),
            }}
          />
        ) : null}
        <div
          className={`space-y-8 max-w-full mt-4 ${
            !page?.blocks || page.blocks.length === 0
              ? VB_EmptyBlockParentClass
              : ""
          }`}
          {...(page?.$ && page?.$.blocks)}
        >
          {page?.blocks?.map((item, index) => {
            const { block } = item;
            const isImageLeft = block.layout === "image_left";

            return (
              <div
                key={block._metadata.uid}
                {...(page?.$ && page?.$[`blocks__${index}`])}
                className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 bg-white ${
                  isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-1/2">
                  {block.image ? (
                    <Image
                      key={`image-${block._metadata.uid}`}
                      src={block.image.url}
                      alt={block.image.title}
                      width={200}
                      height={112}
                      className="w-full"
                      {...(block?.$ && block?.$.image)}
                    />
                  ) : null}
                </div>
                <div className="w-full md:w-1/2 p-4">
                  {block.title ? (
                    <h2
                      className="text-2xl font-bold"
                      {...(block?.$ && block?.$.title)}
                    >
                      {block.title}
                    </h2>
                  ) : null}
                  {block.copy ? (
                    <div
                      {...(block?.$ && block?.$.copy)}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(block.copy),
                      }}
                      className="prose"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
