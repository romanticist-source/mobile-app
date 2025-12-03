import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIconText: {
    fontSize: 20,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  appSubtitle: {
    fontSize: 11,
    color: '#888888',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userIconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  userName: {
    fontSize: 14,
    color: '#333333',
  },
  pageHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF6B6B',
  },
  tabIcon: {
    fontSize: 16,
  },
  tabIconActive: {
    // Icon remains the same
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  tabTextActive: {
    color: '#FF6B6B',
  },
  // Card
  cardContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 8,
  },
  cardHeaderIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  cardHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editButtonIcon: {
    fontSize: 14,
  },
  editButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  cardBody: {
    padding: 16,
  },
  // User Info
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE4E4',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cameraIcon: {
    fontSize: 10,
  },
  userName2: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  // Tags
  sectionLabel: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFE4E4',
    borderRadius: 16,
    gap: 6,
  },
  tagText: {
    fontSize: 13,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  removeTagIcon: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  addConditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  addConditionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  addConditionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addConditionButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // Details
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    color: '#333333',
  },
  detailInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  detailInputMultiline: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  heightWeightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heightWeightInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  heightWeightSeparator: {
    fontSize: 15,
    color: '#666666',
  },
  // Emergency Card
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#C62828',
    gap: 12,
  },
  emergencyHeaderIcon: {
    fontSize: 24,
  },
  emergencyHeaderContent: {
    flex: 1,
  },
  emergencyHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emergencyHeaderSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  emergencySectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencySectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  emergencySectionTitle2: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  emergencyInfoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  emergencyInfoItem: {
    flex: 1,
  },
  emergencyInfoLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  emergencyInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  emergencyTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  emergencyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#C62828',
    borderRadius: 16,
  },
  emergencyTagText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  medicationList: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  medicationItem: {
    fontSize: 14,
    color: '#1565C0',
    marginBottom: 4,
  },
  allergyText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  emergencyContactTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  emergencyContactTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  emergencyContactBox: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  emergencyContactItem: {
    marginBottom: 8,
  },
  emergencyContactLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  emergencyContactName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 2,
  },
  emergencyContactPhone: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  emergencyContactDivider: {
    height: 1,
    backgroundColor: '#FFE4E4',
    marginVertical: 12,
  },
  emergencyNote: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Caregivers
  caregiversSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },
  caregiversHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  caregiversHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  caregiversIcon: {
    fontSize: 18,
    color: '#FF6B6B',
  },
  caregiversTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  caregiverCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    marginBottom: 12,
  },
  caregiverInfo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  caregiverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  caregiverAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#CCCCCC',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statusOnline: {
    backgroundColor: '#4CAF50',
  },
  caregiverDetails: {
    flex: 1,
  },
  caregiverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  caregiverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  caregiverRelation: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  caregiverRole: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  caregiverContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  caregiverPhone: {
    fontSize: 13,
    color: '#666666',
  },
  caregiverEmail: {
    fontSize: 13,
    color: '#666666',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  callButtonIcon: {
    fontSize: 16,
  },
  callButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footerNote: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    marginTop: 12,
  },
});
