//
//  VXWeexViewController.m
//  YingXiaoGuanJia
//
//  Created by voidxin on 16/9/22.
//  Copyright © 2016年 wugumofang. All rights reserved.
//

#import "VXWeexViewController.h"
#import <WeexSDK/WXSDKInstance.h>
@interface VXWeexViewController ()
@property (nonatomic, strong) WXSDKInstance *instance;
@property (nonatomic, strong) UIView *weexView;
@end

@implementation VXWeexViewController
- (void)viewDidLoad {
    [super viewDidLoad];
    [self render];
}
- (void)dealloc
{
    [_instance destroyInstance];
}

- (void)render
{
    _instance = [[WXSDKInstance alloc] init];
    _instance.viewController = self;
    _instance.frame =  self.view.bounds;
    
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        [weakSelf.weexView removeFromSuperview];
        weakSelf.weexView = view;
        [weakSelf.view addSubview:weakSelf.weexView];
        UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, weakSelf.weexView);
    };
    _instance.onFailed = ^(NSError *error) {
        NSLog(@"failed %@",error);
    };
    
    _instance.renderFinish = ^(UIView *view) {
        NSLog(@"render finish");
    };
    
    _instance.updateFinish = ^(UIView *view) {
        NSLog(@"update Finish");
    };
    [_instance renderWithURL:[NSURL URLWithString:self.url] options:@{@"bundleUrl":self.url} data:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
