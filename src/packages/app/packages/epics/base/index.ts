import { IRootState } from '@web/reducers';
import { baseConfigAction } from '@web/reducers/base';
import { IEpicDependency } from '@web/types/base';
import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const GetBaseConfigEpic: Epic<
    ReturnType<typeof baseConfigAction.Fetch.Start>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    IRootState,
    IEpicDependency
> = (action$, state$, { baseAPI }) =>
    action$.pipe(
        ofType(baseConfigAction.Fetch.Start.getType()),
        switchMap((action) => {
            type a = ReturnType<typeof baseConfigAction.Fetch.Start>;
            // const getBaseConfig$ = baseAPI.GetBaseConfig$().pipe(
            //     mergeMap((res: AjaxResponse) => {
            //         let response = res.response;
            //         if (!!response) {
            //             const s3ImageDomain = getS3ImageDomain(config, country);
            //             response = response.map((item: IRecommendationItem) => {
            //                 item.imageUrl = buildImageUrl({
            //                     domain: s3ImageDomain,
            //                     partNumber: item.partNumber,
            //                     size: 120,
            //                     index: item.primaryImageIndex,
            //                 });
            //                 item.discountedPrice =
            //                     item.discountedPrice !== item.listPrice
            //                         ? item.discountedPrice
            //                         : '';
            //                 return item;
            //             });
            //             return of(RecommendationAction.Fetch.Done(response));
            //         }
            //     }),
            //     catchError((err: AjaxError) => {
            //         return of(RecommendationAction.Fetch.Error(err.message));
            //     })
            // );
            // return concat(
            //     api$GetRecommendations,
            //     of(GlobalAction.GoogleAnalytics.Collect('recommendation')),
            //     of(GlobalAction.GoogleAnalytics.Push())
            // );
            return of(
                baseConfigAction.Fetch.Done({
                    langunage: ['CN', 'EN', 'KO'][Math.floor(Math.random() * 2)],
                })
            );
        })
    );

export default { GetBaseConfigEpic };
