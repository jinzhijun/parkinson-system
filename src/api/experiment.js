/* eslint-disable quotes */
import { encapsulatePromise, getCommonRequest } from 'api/common.js';

// 查询实验流程
export function queryExperimentProgress(experimentInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.shengRenYiPatientExperiment = experimentInfo;
  var url = '/pdms/queryPatientExperiment';
  return encapsulatePromise(url, request);
};

// 查询所属医生/治疗者/评估者
export function queryExperimentMember(subjectId) {
  var request = Object.assign({}, getCommonRequest());
  if (subjectId) {
    request.taskInfoId = subjectId;
  }
  // if (experimentGroupId) {
  //   request.taskGroupId = experimentGroupId;
  // }
  // if (roleType) {
  //   // 0.所属医生 1.治疗者 2.评估者  如果没有该参数则三个数组一起返回
  //   request.taskRoleType = roleType;
  // }
  var url = '/pdms/queryTreaterAndAssessor';
  return encapsulatePromise(url, request);
};

// 申请加入实验组
export function applyToEnterExperiment(experimentInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.shengRenYiPatientExperiment = experimentInfo;
  var url = '/pdms/addPatientExperiment';
  return encapsulatePromise(url, request);
};

// 同意加入实验组
export function agreeEnteringExperiment(experimentInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.shengRenYiPatientExperiment = experimentInfo;
  var url = '/pdms/agreePatientExperiment';
  return encapsulatePromise(url, request);
};

// 拒绝加入实验组
export function rejectEnteringExperiment(experimentInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.shengRenYiPatientExperiment = experimentInfo;
  var url = '/pdms/returnPatientExperiment';
  return encapsulatePromise(url, request);
};

// 结束治疗
export function completeExperiment(experimentInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.shengRenYiPatientExperiment = experimentInfo;
  var url = 'pdms/completePatientExperiment';
  return encapsulatePromise(url, request);
};

// 结束随访
export function completeFollowUp(experimentInfo) {
  var request = Object.assign({}, getCommonRequest());
  request.shengRenYiPatientExperiment = experimentInfo;
  var url = 'pdms/completeFollowUp';
  return encapsulatePromise(url, request);
};
