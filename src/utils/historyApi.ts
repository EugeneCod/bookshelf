import { get, push, ref, remove } from 'firebase/database';

import { db } from '../firebase';

import type { HistoryData, PriorHistoryData } from '../app/store/history/types';

function getHistotyRef(userId: string, historyId?: string) {
  return arguments.length === 1
    ? ref(db, `users/${userId}/history`)
    : ref(db, `users/${userId}/history/${historyId}`);
}

export const addUserHistoryToFS = async (
  userId: string,
  historyData: PriorHistoryData,
) => {
  try {
    const historyRef = getHistotyRef(userId);
    const addedHistoryData = await push(historyRef, historyData);
    const historyId = addedHistoryData.key as string;
    return { ...historyData, historyId };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeUserHistoryFromFS = async (
  userId: string,
  historyId: string,
) => {
  try {
    const historyByIdRef = getHistotyRef(userId, historyId);
    await remove(historyByIdRef);
    return historyId;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeAllUserHistoryFromFS = async (userId: string) => {
  try {
    const historyRef = getHistotyRef(userId);
    await remove(historyRef);
    return userId;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserHistoryFromFS = async (userId: string) => {
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
