"use server"
import { Client } from "@notionhq/client";
import { env } from "./env";
import React from "react";
import { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
    auth: env.NOTION_API_KEY,
});

export const fetchPages = React.cache(async () => {
    return (notion.databases as any).query({
        database_id: env.NOTION_DATABASE_ID,
        filter: {
            property: "Status",
            select: {
                equals: "Live",
            },
        }
    });
});

export const fetchBySlug = React.cache(async (slug: string) => {
    return (notion.databases as any).query({
        database_id: env.NOTION_DATABASE_ID,
        filter: {
            property: "slug",
            rich_text: {
                equals: slug,
            }
        }
    }).then((response: { results: PageObjectResponse[] }) => response.results[0] as PageObjectResponse | undefined);
});


export const fetchPage = React.cache(async (pageId: string) => {
    return (notion.blocks.children.list as any)({
        block_id: pageId,
    }).then((response: { results: BlockObjectResponse[] }) => response.results[0] as BlockObjectResponse | undefined);
});