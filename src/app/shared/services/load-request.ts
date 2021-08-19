import { Video } from "src/app/model/video";

export interface LoadRequest{
    isSearchQuery?:boolean
    video: Video
}