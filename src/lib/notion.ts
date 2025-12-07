import "server-only"
import { Client } from "@notionhq/client";
import { env } from "./env";
import React from "react";
import { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
    auth: env.NOTION_API_KEY,
});

const getDataSourceId = React.cache(async () => {
    const database = await notion.databases.retrieve({
        database_id: env.NOTION_DATABASE_ID,
    }) as any;
    
    if (!database.data_sources || database.data_sources.length === 0) {
        throw new Error("Database has no data sources");
    }
    
    return database.data_sources[0].id;
});

export const fetchPages = React.cache(async () => {
    const dataSourceId = await getDataSourceId();
    
    const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        filter: {
            property: "Status",
            status: {
                equals: "Live",
            },
        },
    });
    
    return response.results;
});

export const fetchBySlug = React.cache(async (slug: string) => {
    const dataSourceId = await getDataSourceId();
    
    try {
        const response = await notion.dataSources.query({
            data_source_id: dataSourceId,
            filter: {
                property: "slug",
                rich_text: {
                    equals: slug,
                },
            },
        });
        
        return response.results[0] as PageObjectResponse | undefined;
    } catch (error: any) {
        if (error.code === 'validation_error' && error.message?.includes('rich_text')) {
            const response = await notion.dataSources.query({
                data_source_id: dataSourceId,
                filter: {
                    property: "slug",
                    title: {
                        equals: slug,
                    },
                },
            });
            
            return response.results[0] as PageObjectResponse | undefined;
        }
        throw error;
    }
});

export const fetchPage = React.cache(async (pageId: string) => {
    const allBlocks: BlockObjectResponse[] = [];
    let cursor: string | undefined = undefined;
    
    do {
        const response = await notion.blocks.children.list({
            block_id: pageId,
            start_cursor: cursor,
            page_size: 100,
        });
        
        allBlocks.push(...(response.results as BlockObjectResponse[]));
        cursor = response.next_cursor || undefined;
    } while (cursor);
    
    return allBlocks;
});