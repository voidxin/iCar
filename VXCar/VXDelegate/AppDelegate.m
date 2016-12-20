//
//  AppDelegate.m
//  VXCar
//
//  Created by voidxin on 16/12/19.
//  Copyright © 2016年 voidxin. All rights reserved.
//

#import "AppDelegate.h"
#import <WeexSDK/WeexSDK.h>
#import "VXWeexViewController.h"
#import "ImageDownloadder.h"
#import "WXEventModule.h"
@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    NSString *url = [NSString stringWithFormat:@"file://%@/toutiao.js",[NSBundle mainBundle].bundlePath];
    VXWeexViewController *wxController = [[VXWeexViewController alloc] init];
    wxController.url = url;
    self.window = ({
        UINavigationController *navVC = [[UINavigationController alloc]initWithRootViewController:wxController];
        navVC.navigationBar.hidden = YES;
        UIWindow *window = [[UIWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
        window.rootViewController = navVC;
        window.backgroundColor = [UIColor whiteColor];
        window;
    });
    [self.window makeKeyAndVisible];
    
    [self weexSetter];
    return YES;
}

#pragma mark  weexSettter
- (void)weexSetter{
    //业务配置，非必需
    [WXAppConfiguration setAppGroup:@"AliApp"];
    [WXAppConfiguration setAppName:@"VXCar"];
    [WXAppConfiguration setAppVersion:@"1.0.0"];
    
    //初始化SDK环境
    [WXSDKEngine initSDKEnviroment];
    
    //重写图片加载器
    [WXSDKEngine registerHandler:[ImageDownloadder new] withProtocol:@protocol(WXImgLoaderProtocol)];
    [WXSDKEngine registerHandler:[[WXEventModule alloc] init] withProtocol:@protocol(WXEventModuleProtocol)];
    
    [WXSDKEngine registerComponent:@"select" withClass:NSClassFromString(@"WXSelectComponent")];
    [WXSDKEngine registerModule:@"event" withClass:[WXEventModule class]];

    
    //设置Log输出等级：调试环境默认为Debug，正式发布会自动关闭。
    [WXLog setLogLevel: WXLogLevelAll];//输出日志
}

@end
