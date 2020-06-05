import { handleStrategy, HandleSpan } from "./HandleDecorator";
import { CompositeDecorator } from "draft-js";
import { hashtagStrategy, HashtagSpan } from "./HashDecorator";
import { idStrategy, IDSpan } from "./IdDecorator";
import { CustomLink, customLinkStrategy } from "./LinkDecorator";
import { metaWrapperStrategy, MetaWrapper } from "./MetaWrapperDecorator";

export const compositeDecorator = new CompositeDecorator([
  {
    strategy: handleStrategy,
    component: HandleSpan,
  },
  {
    strategy: hashtagStrategy,
    component: HashtagSpan,
  },
  {
    strategy: idStrategy,
    component: IDSpan,
  },
  {
    strategy: customLinkStrategy,
    component: CustomLink,
  },
  {
    strategy: metaWrapperStrategy,
    component: MetaWrapper,
  },
]);
