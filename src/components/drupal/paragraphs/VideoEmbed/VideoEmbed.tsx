"use client"

import { DrupalParagraph } from "next-drupal"
import "./video-embed.css"
import Link from "next/link"
import Image from "next/image"

interface VideoEmbedProps {
  data: DrupalParagraph
}

function VideoEmbed({ data }: VideoEmbedProps) {
  let hasTextContent = false
  if (
    data.field_icon ||
    data.field_video_heading ||
    data.field_video_caption ||
    data.field_link
  )
    hasTextContent = true

  function handleVideo(e: React.MouseEvent<HTMLElement>) {
    const overlay = e.currentTarget
    const videoContainer = overlay
      .closest(".video-player")
      ?.querySelector(".video-player__video")
    const iframe = videoContainer?.querySelector("iframe")

    overlay.style.display = "none"
    const video = videoContainer?.querySelector("video")
    if (video) {
      video.play()
    } else {
      const iframe = videoContainer?.querySelector("iframe")
      if (iframe) {
        iframe.src = appendAutoplay(iframe.src, true)
      }
    }
    iframe?.setAttribute('tabindex', '0');
  }

  function appendAutoplay(src: string, autoplay: boolean) {
    const url = new URL(src);
    url.searchParams.set('autoplay', autoplay ? '1' : '0');
    return url.toString();
  }

  return (
    <div className="container component__wrapper paragraph--type--video-embed">
      <div
        className={`video-embed__wrapper ${hasTextContent ? "video-embed--with-text" : "video-embed--no-text"}`}
      >
        <div className="video-embed">
          <div className="video-embed--content desktop-layout">
            {data.field_icon && (
              <div className="video-embed--content__icon">
                <Image
                  src={
                    data.field_icon.field_media_image.links.image_optimize.href
                  }
                  alt={data.field_icon.field_media_image.resourceIdObjMeta.alt}
                  width={
                    data.field_icon.field_media_image.links.image_optimize.meta
                      .width
                  }
                  height={
                    data.field_icon.field_media_image.links.image_optimize.meta
                      .height
                  }
                />
              </div>
            )}
            {data.field_video_heading && (
              <h2 className="video-embed--content__heading">
                {data.field_video_heading}
              </h2>
            )}

            {data.field_video_caption && (
              <p className="video-embed--content__caption">
                {data.field_video_caption}
              </p>
            )}

            {data.field_link && (
              <div>
                <Link
                  className="video-embed--content__link link-arrow-btn link-arrow-btn--default"
                  href={data.field_link.full_url}
                >
                  {data.field_link.title}
                </Link>
              </div>
            )}
          </div>

          <div className="video-player">
            <div
              className="video-player__overlay"
              id="overlay"
              role="button"
              aria-label="Click here to play video"
              style={{
                backgroundImage: `url(
                  ${data.field_image.field_media_image.links.image_video_cover.href}
                )`,
              }}
              onClick={(e) => handleVideo(e)}
            ></div>
            <div
              className="video-player__video"
              id="videoContainer"
              dangerouslySetInnerHTML={{ __html: data.field_video_source }}
            ></div>
          </div>

          <div className="video-embed--content mobile-layout">
            {data.field_video_heading && (
              <h2 className="video-embed--content__heading">
                {data.field_video_heading}
              </h2>
            )}

            {data.field_video_caption && (
              <p className="video-embed--content__caption">
                {data.field_video_caption}
              </p>
            )}

            {data.field_link && (
              <div>
                <Link
                  className="video-embed--content__link link-arrow-btn link-arrow-btn--default"
                  href={data.field_link.full_url}
                >
                  {data.field_link.title}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoEmbed
