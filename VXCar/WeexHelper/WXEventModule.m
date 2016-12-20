/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXEventModule.h"

#import "VXWeexViewController.h"

#import <WeexSDK/WXBaseViewController.h>

@implementation WXEventModule
@synthesize weexInstance;
WX_EXPORT_METHOD(@selector(openURL:))
- (void)openURL:(NSString *)url
{
    //通过“？title="拼接传递标题过来
    //设置标题
    NSString *title = @"";
    if ([url containsString:@"title="]) {
        NSArray *strArr = [url componentsSeparatedByString:@"?title="];
        title = strArr.lastObject;
        url = strArr.firstObject;
    }
    NSString *newURL = url;
    if ([url hasPrefix:@"//"]) {
        newURL = [NSString stringWithFormat:@"http:%@", url];
    } else if (![url hasPrefix:@"http"]) {
        // relative path
        newURL = [NSURL URLWithString:url relativeToURL:weexInstance.scriptURL].absoluteString;
    }
    VXWeexViewController *controller = [[VXWeexViewController alloc] init];
    ((VXWeexViewController *)controller).url = newURL;
    ((VXWeexViewController *)controller).title = title;
    [[weexInstance.viewController navigationController] pushViewController:controller animated:YES];
}



@end

