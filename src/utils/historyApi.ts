import { get, push, ref, remove } from 'firebase/database';

import { db } from '../firebase';

import type { HistoryData, PriorHistoryData } from '../app/store/history/types';
import type { DatabaseReference } from 'firebase/database';

function getHistotyRef(userId: string, historyId?: string): DatabaseReference {
  return arguments.length === 1
    ? ref(db, `users/${userId}/history`)
    : ref(db, `users/${userId}/history/${historyId}`);
}

export const requestAdditionRecord = async (
  userId: string,
  historyData: PriorHistoryData,
): Promise<HistoryData> => {
  try {
    const historyRef = getHistotyRef(userId);
    const addedHistoryData = await push(historyRef, historyData);
    const historyId = addedHistoryData.key as string;
    return { ...historyData, historyId };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const requestToDeleteRecord = async (
  userId: string,
  historyId: string,
): Promise<string> => {
  try {
    const historyByIdRef = getHistotyRef(userId, historyId);
    await remove(historyByIdRef);
    return historyId;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const requestToClearRecords = async (
  userId: string,
): Promise<string> => {
  try {
    const historyRef = getHistotyRef(userId);
    await remove(historyRef);
    return userId;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const requestRecords = async (
  userId: string,
): Promise<HistoryData[]> => {
  try {
    const historyRef = getHistotyRef(userId);
    const snapshot = await get(historyRef);
    const snapshotValue: Record<string, PriorHistoryData> | null =
      snapshot.val();
    if (snapshotValue) {
      const snapshotEntries = Object.entries(snapshotValue);
      const historyData: HistoryData[] = snapshotEntries.map(
        ([historyId, priorHistoryData]) => ({
          ...priorHistoryData,
          historyId,
        }),
      );
      return historyData;
    }
    return [];
  } catch (error) {
    return Promise.reject(error);
  }
};
